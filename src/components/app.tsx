import useApp from '../hooks/useApp'

function App() {
  const { count, increment } = useApp()

  return (
    <>
      <main>
        <p>main</p>
        <button type="button" onClick={() => increment()}>
          Increment
        </button>
        <p>Count: {count}</p>
      </main>
    </>
  )
}

export default App
