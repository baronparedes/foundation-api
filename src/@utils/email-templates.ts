function container(content: string) {
  const html = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <h2 style="font-family: 'Fredoka One', cursive;">
                    <strong>foundation</strong>
                </h2>
            </div>
            ${content}
            <hr style="border:none;border-top:1px solid #eee" />
            <br/>
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>This is a system generated message</p>
                <p>Do not reply</p>
            </div>
        </div>
    </div>
    `;
  return html;
}

export function resetPasswordTemplate(password: string) {
  const html = `
    <p style="font-size:1.1em">Hi,</p>
    <p>You have requested for a password reset.</p>
    <h1 style="background: #03284A;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
        ${password}
    </h1>
  `;
  return container(html);
}
