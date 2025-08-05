const handleSubmit = async () => {

    try {
      const response = await fetch('https://ghostly-backend-cyan.vercel.app/api/users/register', 
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:"username", password: "pass" }),
        } 
      )
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

    } catch (error) {
        console.log(error);
    }
}

handleSubmit();