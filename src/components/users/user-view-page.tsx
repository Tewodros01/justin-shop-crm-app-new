import { notFound } from 'next/navigation';
import UserForm from './user-form';
import { getUserById } from '@/actions/user-action';
import { StoreUser } from 'types/store-user';

type TUserViewPageProps = {
  userId: string;
};

export default async function UserViewPage({ userId }: TUserViewPageProps) {
  let user: StoreUser | null = null;
  let pageTitle = 'Create New User';

  if (userId !== 'new') {
    const data = await getUserById(userId); // Fetch user data

    if (!data) {
      notFound();
    }

    user = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      store_id: data.store_id,
      created_at: data.created_at,
      updated_at: data.updated_at
    };

    pageTitle = `Edit User`;
  }

  return <UserForm initialData={user} pageTitle={pageTitle} />;
}
