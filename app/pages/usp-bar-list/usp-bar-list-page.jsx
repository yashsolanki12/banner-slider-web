import UspBarList from "./index";

const UspBarListPage = (props) => {
  const { appEmbedEnabled, session } = props;

  return (
    <>
      <UspBarList appEmbedEnabled={appEmbedEnabled} session={session} />
    </>
  );
};

export default UspBarListPage;
