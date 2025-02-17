import {cn} from '@/lib/utils';

type ContainerProps = React.ComponentProps<'div'>;

const Container = ({children, className, ...props}: ContainerProps) => {
	return (
		<div {...props} className={cn(className, 'max-w-5xl px-5')}>
			{children}
		</div>
	);
};

export default Container;
