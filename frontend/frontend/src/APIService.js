export default class APIService {
    static async LoginUser(body) {
        console.log("sss")
      const resp = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      return await resp.json();
    }
}