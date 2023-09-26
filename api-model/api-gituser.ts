import {
  setGitUserName,
  setGitUserEmail,
  checkGitUserName,
  checkGitUserEmail,
} from "code-genius";

(async () => {
  await setGitUserName("OSpoon", "[\\s\\S]*");
  await setGitUserEmail(
    "zxin088@gmail.com",
    "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$"
  );
  await checkGitUserName("[\\s\\S]*");
  await checkGitUserEmail("^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$");
})();
