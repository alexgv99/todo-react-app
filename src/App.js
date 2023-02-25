import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef
} from 'react';

import { nanoid } from 'nanoid';

import useKeypress from './custom-hooks/useKeypress';

function App() {
	/* #region estados */
	const [nome, setNome] = useState('');
	const [todos, setTodos] = useState([
		{ id: nanoid(), nome: 'Instalar o ambiente', done: true },
		{ id: nanoid(), nome: 'Aprender React', done: true },
		{ id: nanoid(), nome: 'Entender hooks', done: true },
		{ id: nanoid(), nome: 'Aprender TailwindCSS', done: false },
		{ id: nanoid(), nome: 'Concluir a primeira tarefa de sprint', done: false }
	]);
	const [errors, setErrors] = useState({});
	const refInput = useRef();
	const outroRef = useRef('procempa');
	const nomesAcumulados = useMemo(
		() => todos.map(t => t.nome).join(', '),
		[todos]
	);
	/* #endregion */

	/* #region handlers */
	const handleNomeChange = useCallback(e => setNome(e.target.value), []);

	const handleButton = useCallback(() => {
		console.debug('clic');
		if (nome.trim().length === 0) {
			setErrors({ nome: ['faltou preencher'] });
		} else {
			setTodos(old => [...old, { id: crypto.randomUUID(), nome, done: false }]);
			setNome('');
			setErrors({});
			refInput.current.focus();
			outroRef.current = 'era procempa';
		}
	}, [nome]);

	const handleDone = useCallback(todo => {
		setTodos(old =>
			old.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t))
		);
	}, []);

	/* #endregion */

	/* #region custom hooks */
	useKeypress('Escape', () => setNome(''));
	useKeypress('Enter', handleButton);
	/* #endregion */

	/* #region effects */
	useEffect(() => {
		console.debug('nome', nome, outroRef.current);
	}, [nome]);
	/* #endregion */

	/* #region render */
	return (
		<div className="container-sm bg-slate-200 p-20 h-screen mx-auto flex flex-col items-center relative">
			<h1 className="text-4xl mb-20">TO DO App</h1>
			<div className="flex gap-1 items-baseline">
				<input
					className="border p-5 m-5"
					ref={refInput}
					type="text"
					value={nome}
					onChange={handleNomeChange}
				/>
				<button
					className="px-10 py-0 h-16 bg-blue-400"
					type="button"
					onClick={() => handleButton()}
				>
					submit
				</button>
			</div>
			{errors?.nome &&
				errors.nome.map((error, i) => (
					<div style={{ fontSize: '14pt', color: 'red' }} key={i}>
						{i} - {error}
					</div>
				))}
			<ul className="w-1/3">
				{todos.map((todo, i) => (
					<li key={todo.id} className="p-5" onClick={() => handleDone(todo)}>
						<span className={`${todo.done ? 'line-through' : ''}`}>
							{i + 1} - {todo.nome}
						</span>
					</li>
				))}
			</ul>
			<div className="absolute" style={{ bottom: '20px' }}>
				{nomesAcumulados}
			</div>
		</div>
	);
	/* #endregion */
}
App.displayName = 'App';

export default App;
