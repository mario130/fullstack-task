import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold text-center">Register / Login test</h1>
      </header>
      <main className='flex justify-center space-x-10 p-10'>
        <Register />
        <Login />
      </main>
    </div>
  );
}

export default App;