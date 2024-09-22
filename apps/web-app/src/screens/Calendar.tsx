import axios, { AxiosError } from 'axios';
import OpenAI from 'openai';
import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Use the environment variable
    dangerouslyAllowBrowser: true,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // מתחילים את העיבוד
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });
      console.log(chatCompletion);
      // Optionally handle the response
      // setResponse(chatCompletion.choices[0].message.content);
    } catch (error) {
      setResponse(`${error}`);
      console.error('Error occurred while calling OpenAI API:', error);
      setIsLoading(false);
    }
    // try {
    //   const res = await axios.post(
    //     'https://api.openai.com/v1/chat/completions',
    //     {
    //       model: 'gpt-3.5-turbo',
    //       messages: [{ role: 'user', content: input }],
    //     },
    //     {
    //       headers: {
    //         Authorization: process.env.REACT_APP_OPENAI_API_KEY,
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   );
    //
    //   setResponse(res.data.choices[0].message.content);
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     if (error.response.status === 429) {
    //       console.error(
    //         'Quota exceeded. Please check your plan and billing details.',
    //       );
    //       setResponse(
    //         'Quota exceeded. Please check your plan and billing details.',
    //       );
    //     } else {
    //       console.error('Error fetching response:', error.response.data);
    //       setResponse('There was an error fetching the response.');
    //     }
    //   } else {
    //     console.error('Unexpected error:', error);
    //     setResponse('There was an unexpected error.');
    //   }
    // }
  };

  return (
    <>
      <h1>Calendar Screen!! We'll work on it</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שאל שאלה"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'שליחה...' : 'שלח'}
          </button>
        </form>
        <div>
          <h2>תשובה:</h2>
          <p>{response}</p>
        </div>
      </div>
    </>
  );
};

export default Calendar;
