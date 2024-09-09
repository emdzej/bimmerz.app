
 
const func = async () => {
    const response = await (window as any).api.send('toMain', 'ping')
    console.log(response) // prints out 'pong'
  }
  
  func()