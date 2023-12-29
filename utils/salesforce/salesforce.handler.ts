"use server"

export async function SalesforceSignUpHandler (email:string){
    const encodedEmail = 'email='+ encodeURI(email);

    fetch('https://go.verdantix.com/l/562622/2023-12-28/7tsbr4?' + encodedEmail, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        Accept: 'text/html; charset=UTF-8',
        'Content-Type': 'text/html; charset=UTF-8',
      },
    })
}
export async function SalesforceSignInHandler (email:string){
  const encodedEmail = 'email='+ encodeURI(email);

  fetch('UPDATE?' + encodedEmail, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      Accept: 'text/html; charset=UTF-8',
      'Content-Type': 'text/html; charset=UTF-8',
    },
  })
}