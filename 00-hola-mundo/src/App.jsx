import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

const users = [
  { id: 1, userName: 'tzalejo', name: 'Alejandro Valenzuela', isFollowing: true },
  { id: 2, userName: 'TMChein', name: 'Tomas', isFollowing: false },
  { id: 3, userName: 'PacoHdezs', name: 'Paco Hdezs', isFollowing: false },
  { id: 4, userName: 'midudev', name: 'Miguel Angel Duran', isFollowing: true },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ id, userName, name, isFollowing }) => (
        <TwitterFollowCard key={id} userName={userName} initialIsFollowing={isFollowing}>
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
