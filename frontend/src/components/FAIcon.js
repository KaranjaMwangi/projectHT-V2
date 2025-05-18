// components/FAIcon.js
import dynamic from 'next/dynamic';

const FAIcon = dynamic(() => import('./FAIconBase'), { ssr: false });
export default FAIcon;
