'use client'
export default function ProductExample () {
    const product = {name: "patoto"}
    const handleSendRequest = async () => {
        try {
            const response = await fetch("http://localhost:4300/product", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(product)});
            const data = await response.json();
            console.log(JSON.stringify(data));
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    return <>
            <button onClick={handleSendRequest}>
                sendRequest
            </button>
    
    </>
}