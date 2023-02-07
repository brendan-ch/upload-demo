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

  async function handleGetFiles() {
    const response = await fetch('/api/get-files');
    const json = await response.json();
    console.log(json);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button>Submit</button>
      </form>
      <button onClick={handleGetFiles}>Get Files</button>
    </div>
  );
}