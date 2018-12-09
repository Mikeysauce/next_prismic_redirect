import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import Link from 'next/link';

const Layout = ({ children }) => (
	<Fragment>
		<nav>
			<ul>
				<li>
					<Link href="/b" as="/a">
						<a>a</a>
					</Link>
				</li>
				<li>
					<Link href="/a" as="/b">
						<a>b</a>
					</Link>
				</li>
				<li>
					<Link href={{ pathname: '/posts', query: { id: '2' } }} as="/posts/2">
						<a>post #2</a>
					</Link>
				</li>
				<li>
					<Link prefetch href="/from-here">
						<a>Go</a>
					</Link>
				</li>
				<li>
					<Link prefetch href="/nonsense">
						<a>404</a>
					</Link>
				</li>
			</ul>
		</nav>
		<main>{children}</main>
	</Fragment>
);

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Container>
		);
	}
}
