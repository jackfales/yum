import Head from 'next/head';

export default function Account() {
  return (
    <div>
      <Head>
          <title>Create Account</title>
      </Head>
      <main>
        <div>
          <form method='POST' action=''>
            <Input name='Username' type='text'></Input>
            <Input name='Email' type='text'></Input>
            <Input name='Password' type='text'></Input>
            <Input name='Confirm Password' type='text'></Input>
            <button type='submit'>Create Account</button>
          </form>
        </div>
      </main>
    </div>
  )

  function Input({name, type}) {
    let nameSpacesRemoved = name.replace(/\s/g, '').toLocaleLowerCase();
    return (
      <div>
        <label htmlFor={nameSpacesRemoved}>{name}:</label>
        <input type={type} id={nameSpacesRemoved} name={nameSpacesRemoved}></input>
      </div>
    )
  }
}