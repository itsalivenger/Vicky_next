async function sendRequest(url, method = 'GET', body = null, headers = {}, isFormData) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers  // Merge any additional headers
            },
        };

        // Include body for methods like POST or PUT
        if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH') && !isFormData) {
            options.body = JSON.stringify(body);
        }

        if(isFormData){
            options.body = body;
            options.headers = {}
        }

        const response = await fetch(url, options);


        // Parse the response as JSON
        const data = await response.json();
        return data;  // Return the data to the caller
    } catch (error) {
        console.error('Error:', error);
        return {error, msg: 'error'};
    }
}

export default sendRequest;
// Example usage:
// sendRequest('https://api.example.com/data', 'POST', { key: 'value' })
//   .then(data => console.log(data))
//   .catch(err => console.error(err));