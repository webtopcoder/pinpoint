import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// project import
// import ComponentLayout from './ComponentLayout';
import UserLayout from '../components/Layout/UserLayout';

import AuthGuard from '@/utils/route-guard/AuthGuard';

// import GuestGuard from 'utils/route-guard/GuestGuard';

// project import - store
// import { openComponentDrawer } from 'store/reducers/menu';

// const Header = lazy(() => import('./Header'));
// const FooterBlock = lazy(() => import('./FooterBlock'));

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = 'main', children }) {

  //     return (
  //         <UserLayout>{children}</UserLayout>
  //     )
  //   const dispatch = useDispatch();

  //   const menu = useSelector((state) => state.menu);
  //   const { componentDrawerOpen } = menu;

  //   const handleDrawerOpen = () => {
  //     dispatch(openComponentDrawer({ componentDrawerOpen: !componentDrawerOpen }));
  //   };

  //   if (variant === 'landing' || variant === 'simple') {
  //     return (
  //       <Suspense fallback={<Loader />}>
  //         <Header layout={variant} />
  //         {children}
  //         <FooterBlock isFull={variant === 'landing'} />
  //       </Suspense>
  //     );
  //   }

  //   if (variant === 'component') {
  //     return (
  //       <Suspense fallback={<Loader />}>
  //         <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
  //           <Header handleDrawerOpen={handleDrawerOpen} layout="component" />
  //           <Toolbar sx={{ my: 2 }} />
  //           <ComponentLayout handleDrawerOpen={handleDrawerOpen} componentDrawerOpen={componentDrawerOpen}>
  //             {children}
  //           </ComponentLayout>
  //         </Container>
  //       </Suspense>
  //     );
  //   }

  //   if (variant === 'blank') {
  //     return children;
  //   }

  //   if (variant === 'auth') {
  //     return <GuestGuard>{children}</GuestGuard>;
  //   }

  return (
    <AuthGuard>
      <UserLayout>{children}</UserLayout>
    </AuthGuard>
  );
}
