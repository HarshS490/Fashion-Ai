'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error |null
  reset: () => void
}) {
  if(!error){
    return null;
  }
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h2>{error.name}</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}