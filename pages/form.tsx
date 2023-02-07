import React from "react";


export default function Form() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();
    console.log(json);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" />
      <button>Submit</button>
    </form>
  );
}