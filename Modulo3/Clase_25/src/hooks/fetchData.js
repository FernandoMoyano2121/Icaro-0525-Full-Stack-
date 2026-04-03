export async function fetchUsuers(url) {
  const response = await fetch(url);
  const data = response.json();
  console.log(data);
}
