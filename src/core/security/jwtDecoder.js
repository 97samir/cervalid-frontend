// util para decodificar JWT

/*
export function decodeJWT(token) {
  if (!token) return null;

  try{

    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return JSON.parse(decoded);
  }catch(err){
    console.error("Error decodificando JWT:", err);
    return null;
  }
}


*/