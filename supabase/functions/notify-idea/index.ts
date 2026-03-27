import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

serve(async (req: Request) => {
    try {
        // 1. Extract the payload from the Supabase Webhook
        const payload = await req.json();

        // The Webhook sends the new row data inside the "record" object
        const record = payload.record;

        // 2. Send the email via Resend
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            },
            body: JSON.stringify({
                from: 'Portfolio <onboarding@resend.dev>',
                to: ['m.m.stafa2742@gmail.com'],
                subject: `New Market Idea: ${record.title}`,
                html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h2>💡 New Idea Submitted</h2>
            <p><strong>Title:</strong> ${record.title}</p>
            <p><strong>Description:</strong> ${record.description}</p>
            <hr />
            <p><small>Sent via Supabase Edge Functions</small></p>
          </div>
        `,
            }),
        });

        const result = await res.json();
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
})