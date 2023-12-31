module.exports = {
  hooks: {
    "after:bump": "npx codeg depcheck && npm run build",
  },
  git: {
    commitMessage: "chore: release v${version}",
    commit: true,
    tag: true,
    push: true,
  },
  github: {
    release: true,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      infile: "CHANGELOG.md",
      preset: {
        name: "conventionalcommits",
        header: "# Changelog",
        types: [
          { type: "feat", section: "Features" },
          { type: "fix", section: "Bug Fixes" },
          { type: "chore", hidden: true },
          { type: "docs", hidden: true },
          { type: "style", hidden: true },
          { type: "refactor", hidden: true },
          { type: "perf", hidden: true },
          { type: "test", hidden: true },
        ],
      },
    },
  },
};
