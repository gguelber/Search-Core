
it('Test handleClickSignUp', async () => {
  const nameInput = 'Gustavo'
  const emailInput = 'gguelber1@yahoo.com.br'
  const passInput = '123456'
  const res = await fetch('http://localhost:3000/api/user/register', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: nameInput,  
        email: emailInput,
        password: passInput
    })
    })
    console.warn(res.status)
    expect(res.status).toEqual(409) 
})