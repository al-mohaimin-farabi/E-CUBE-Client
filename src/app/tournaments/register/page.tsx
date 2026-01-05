import { redirect } from 'next/navigation';

// This page handles the case when someone navigates to /tournaments/register without an ID
const TournamentRegisterIndexPage = () => {
  // Redirect to tournaments page
  redirect('/tournaments');
};

export default TournamentRegisterIndexPage;
