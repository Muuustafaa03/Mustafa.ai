import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
    }

    try {
        const payload = await req.json();
        const record = payload.record;

        console.log("Processing record:", record);

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            },
            body: JSON.stringify({
                from: 'Portfolio <onboarding@resend.dev>',
                to: ['m.m.stafa2742@gmail.com'],
                subject: `New Idea: ${record?.title?.trim() || record?.concept?.substring(0, 40) || 'New Submission'}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #06b6d4;">💡 New Idea Submitted</h2>
                        <p style="margin: 5px 0;"><strong>Title:</strong> ${record?.title || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Alias:</strong> ${record?.alias || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Contact:</strong> ${record?.contact || 'N/A'}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p><strong>Concept:</strong></p>
                        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">
                            ${record?.concept || 'N/A'}
                        </p>
                        <p style="font-size: 12px; color: #999; margin-top: 20px;">Sent via Supabase Edge Functions</p>
                    </div>
                `,
            }),
        });

        const result = await res.text();
        console.log("Resend API Response:", result);

        return new Response(result, {
            status: res.status,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error("Function Error:", err.message);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
})