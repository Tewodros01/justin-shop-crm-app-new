'use server';

export async function getData() {
  // Simulate fetching data from an API or database
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  console.log('Respons', res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
