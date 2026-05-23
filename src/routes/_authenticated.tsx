import {
	createFileRoute,
	Navigate,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "#/components/error-boundary";
import { LoadingLayout } from "#/layouts/loading-layout";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context }) => {
		if (!context.userId) throw redirect({ to: "/", replace: true });
	},
	loader: ({ context }) => {
		return { userId: context.userId };
	},
	component: AuthenticatedLayout,
	pendingComponent: LoadingLayout,
	ssr: false,
});

function AuthenticatedLayout() {
	const { userId } = Route.useRouteContext();

	if (!userId) return <Navigate to="/" />;

	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingLayout />}>
				<Outlet />
			</Suspense>
		</ErrorBoundary>
	);
}
