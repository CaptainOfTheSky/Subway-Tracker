
const handleError = (error) => ({ error });
const baseUrl = "https://api.wmata.com/StationPrediction.svc/json/";
const path = "GetPrediction/B03";

export const createApi = (baseUrl) => {
  const getJson = (path) =>
    fetch(`${baseUrl}${path}`).then((res) => res.json());
    
    fetch('https://api.npms.io/v2/search?q=react', { headers })
    .then(response => response.json())
    .then(data => this.setState({ totalReactPackages: data.total }));

  return {
    getItems: () => getJson('/items.json').catch(handleError),
  };
};

export default createApi('http://localhost:3000');


// const headers = { 'Content-Type': 'application/json' }