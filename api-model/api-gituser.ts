import {
  setGitUserName,
  setGitUserEmail,
  checkGitUserInfo,
} from "../src/index";

(async () => {
  await setGitUserName("OSpoon", "[\\s\\S]*");
  await setGitUserEmail(
    "zxin088@gmail.com",
    "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$"
  );
  await checkGitUserInfo("[\\s\\S]*", "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$");
})();
