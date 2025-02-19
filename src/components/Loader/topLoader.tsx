import './topLoader.css';

interface TopLoaderProps {
  isActive: boolean;
}

const TopLoader: React.FC<TopLoaderProps> = ({ isActive }) => {
  return (
    <div className={`shimmer ${isActive ? 'block' : 'hidden'}`}></div>
  );
};

export default TopLoader;
