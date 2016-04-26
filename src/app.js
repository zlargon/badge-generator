import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import './app.less';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      githubId: '',
      projectName: '',
      projectBranch: 'master',
      travis: false,
      appveyor: false,
      coveralls: false,
      npmPackageName: '',
      npmDependencies: false,
      npmDevDependencies: false,
      npmPeerDependencies: false,
      markdownRaw: ''
    };
  }

  rename (type, event) {
    const state = Object.assign({}, this.state, { [type]: event.target.value });
    this.build(state);
  }

  toggle (type) {
    const state = Object.assign({}, this.state, { [type]: !this.state[type] });
    this.build(state);
  }

  build ({
    githubId, projectName, projectBranch,
    travis, appveyor, coveralls,
    npmPackageName, npmDependencies, npmDevDependencies, npmPeerDependencies }) {

    let header = [];
    let footer = [];

    // nodei.co
    if (npmPackageName) {
      header.push(`[![][npm-img]][npm-url]`);
      footer.push(
        `[npm-url]: https://nodei.co/npm/${npmPackageName}\n` +
        `[npm-img]: https://nodei.co/npm/${npmPackageName}.png`
      );
    }

    // npmDependencies
    if (npmDependencies) {
      header.push(`[![][dependency-img]][dependency-url]`);
      footer.push(
        `[dependency-url]: https://david-dm.org/${githubId}/${projectName}\n` +
        `[dependency-img]: https://img.shields.io/david/${githubId}/${projectName}.svg`
      );
    }

    // npmDevDependencies
    if (npmDevDependencies) {
      header.push(`[![][dependency-dev-img]][dependency-dev-url]`);
      footer.push(
        `[dependency-dev-url]: https://david-dm.org/${githubId}/${projectName}#info=devDependencies\n` +
        `[dependency-dev-img]: https://img.shields.io/david/dev/${githubId}/${projectName}.svg`
      );
    }

    // npmPeerDependencies
    if (npmPeerDependencies) {
      header.push(`[![][dependency-peer-img]][dependency-peer-url]`);
      footer.push(
        `[dependency-peer-url]: https://david-dm.org/${githubId}/${projectName}#info=peerDependencies\n` +
        `[dependency-peer-img]: https://img.shields.io/david/peer/${githubId}/${projectName}.svg`
      );
    }

    // travis
    if (travis) {
      header.push(`[![][travis-img]][travis-url]`);
      footer.push(
        `[travis-url]: https://travis-ci.org/${githubId}/${projectName}\n` +
        `[travis-img]: https://img.shields.io/travis/${githubId}/${projectName}/${projectBranch}.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSItMTQyLjUgLTE0Mi41IDI4NSAyODUiPjxjaXJjbGUgcj0iMTQxLjciIGZpbGw9IiNERDQ4MTQiLz48ZyBpZD0iYSIgZmlsbD0iI0ZGRiI%2BPGNpcmNsZSBjeD0iLTk2LjQiIHI9IjE4LjkiLz48cGF0aCBkPSJNLTQ1LjYgNjguNGMtMTYuNi0xMS0yOS0yOC0zNC00Ny44IDYtNSA5LjgtMTIuMyA5LjgtMjAuNnMtMy44LTE1LjctOS44LTIwLjZjNS0xOS44IDE3LjQtMzYuNyAzNC00Ny44bDEzLjggMjMuMkMtNDYtMzUuMi01NS4zLTE4LjctNTUuMyAwYzAgMTguNyA5LjMgMzUuMiAyMy41IDQ1LjJ6Ii8%2BPC9nPjx1c2UgeGxpbms6aHJlZj0iI2EiIHRyYW5zZm9ybT0icm90YXRlKDEyMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSgyNDApIi8%2BPC9zdmc%2B`
      );
    }

    // appveyor
    if (appveyor) {
      header.push(`[![][appveyor-img]][appveyor-url]`);
      footer.push(
        `[appveyor-url]: https://ci.appveyor.com/project/${githubId}/${projectName}/${projectBranch}\n` +
        `[appveyor-img]: https://img.shields.io/appveyor/ci/${githubId}/${projectName}/${projectBranch}.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZyBmaWxsPSIjMUJBMUUyIiB0cmFuc2Zvcm09InNjYWxlKDgpIj48cGF0aCBkPSJNMCAyLjI2NWw2LjUzOS0uODg4LjAwMyA2LjI4OC02LjUzNi4wMzd6Ii8%2BPHBhdGggZD0iTTYuNTM2IDguMzlsLjAwNSA2LjI5My02LjUzNi0uODk2di01LjQ0eiIvPjxwYXRoIGQ9Ik03LjMyOCAxLjI2MWw4LjY3LTEuMjYxdjcuNTg1bC04LjY3LjA2OXoiLz48cGF0aCBkPSJNMTYgOC40NDlsLS4wMDIgNy41NTEtOC42Ny0xLjIyLS4wMTItNi4zNDV6Ii8%2BPC9nPjwvc3ZnPg==`
      );
    }

    // coveralls
    if (coveralls) {
      header.push(`[![][coverage-img]][coverage-url]`);
      footer.push(
        `[coverage-url]: https://coveralls.io/github/${githubId}/${projectName}?branch=${projectBranch}\n` +
        `[coverage-img]: https://img.shields.io/coveralls/${githubId}/${projectName}/${projectBranch}.svg`
      );
    }

    // separate header and footer
    header.push('');

    // update state
    this.setState({
      githubId,
      projectName,
      projectBranch,
      travis,
      appveyor,
      coveralls,
      npmPackageName,
      npmDependencies,
      npmDevDependencies,
      npmPeerDependencies,
      markdownRaw: header.concat(footer).join('\n\n')
    });
  }

  render () {
    return (
      <div className='container'>
        <h1>Badge Markdown Generator</h1>
        <div>
          <div>
            <lable>Github ID: </lable>
            <input type='text'
              value={this.state.githubId}
              onChange={this.rename.bind(this, 'githubId')}
            />
            <br/>
            <lable>Project Name: </lable>
            <input type='text'
              value={this.state.projectName}
              onChange={this.rename.bind(this, 'projectName')}
            />
            <br/>
            <lable>Project Branch: </lable>
            <input type='text'
              value={this.state.projectBranch}
              onChange={this.rename.bind(this, 'projectBranch')}
            />
            <br/>
            <input type='checkbox'
              checked={this.state.travis}
              onChange={this.toggle.bind(this, 'travis')}
            />
            <lable> Travis-CI</lable>
            <br/>
            <input type='checkbox'
              checked={this.state.appveyor}
              onChange={this.toggle.bind(this, 'appveyor')}
            />
            <lable> AppVeyor</lable>
            <br/>
            <input type='checkbox'
              checked={this.state.coveralls}
              onChange={this.toggle.bind(this, 'coveralls')}
            />
            <lable> Coveralls</lable>
          </div>
          <div>
            <lable> NPM Package Name </lable>
            <input type='text'
              value={this.state.npmPackageName}
              onChange={this.rename.bind(this, 'npmPackageName')}
            />
            <br/>
            <input type='checkbox'
              checked={this.state.npmDependencies}
              onChange={this.toggle.bind(this, 'npmDependencies')}
            />
            <lable> NPM Dependencies</lable>
            <br/>
            <input type='checkbox'
              checked={this.state.npmDevDependencies}
              onChange={this.toggle.bind(this, 'npmDevDependencies')}
            />
            <lable> NPM Dev Dependencies</lable>
            <br/>
            <input type='checkbox'
              checked={this.state.npmPeerDependencies}
              onChange={this.toggle.bind(this, 'npmPeerDependencies')}
            />
            <lable> NPM Peer Dependencies</lable>
          </div>
        </div>
        <div>
          <div className='markdown-raw'>{this.state.markdownRaw}</div>
          <ReactMarkdown className='markdown-body' source={this.state.markdownRaw} />
        </div>
      </div>
    );
  }
}
