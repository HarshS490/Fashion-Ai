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
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}