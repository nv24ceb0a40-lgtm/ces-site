import useInView from '../hooks/useInView';

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}