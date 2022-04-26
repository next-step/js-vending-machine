const useRouter = {
  getPath: () => window.location.pathname.split('/').slice(1),
};

export default useRouter;
