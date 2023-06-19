import '@/app/styles/globals.css';
import { Manrope } from 'next/font/google'
import { AuthContext, ToasterContext } from './context';
import { BottomNav, Followbar, Sidebar } from './components';
import { getCurrentUser, getUsers } from './actions';
import { EditModal, LoginModal, LogoutModal, RegisterModal } from '@/app/components';


const manrope = Manrope({ subsets: ['latin'], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: 'Home - Twitter',
  description: 'Twitter 2.0 by Shreyas',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  const users = await getUsers();

  return (
    <html lang="en">
      <link rel="shortcut icon" href="/images/twitter.png" type="image/x-icon" />
      <body className={`${manrope.className} body`}>
        <AuthContext>
          <ToasterContext />
          <RegisterModal />
          <LoginModal />
          <LogoutModal />
          <EditModal user={currentUser} />
          <div className='w-96 h-60 bg-gradient-to-t from-sky-200/70 to-white/50 blur-3xl opacity-20 absolute top-2 left-56 hidden lg:block' />
          <div className='container h-full mx-auto xl:px-24 max-w-[1360px]'>
            <div className='grid grid-cols-4 h-full w-full'>
              <Sidebar currentUser={currentUser} />
              <BottomNav user={currentUser} />
              <div className='col-span-4 md:col-span-3 lg:col-span-2 border-x border-neutral-800 overflow-y-scroll scrollbar-hide'>
                {children}
              </div>
              <Followbar users={users} />
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  )
}