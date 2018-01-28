import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import Table from './Table';
import fetchProjects from '../api/fetchProjects';

class HomePageContainer extends Component {
  static propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string
    }).isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filteredData: [],
      title: props.title
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged = () => {
    const { data } = this.state;
    this.setState({
      filteredData: this.getFilteredData(data)
    });
  };

  getFilteredData = serverData => {
    const { location } = this.props;
    const newFilter = this.getFilterValue(location);
    return newFilter === '*'
      ? serverData
      : serverData.filter(project => project.overallStatus === newFilter);
  };

  getFilterValue = location => {
    switch (location.pathname) {
      case '/red':
        return 'R';
      case '/yellow':
        return 'Y';
      case '/green':
        return 'G';
      default:
        return '*';
    }
  };

  fetchProjects = () => {
    fetchProjects().then(serverPlans => {
      this.setState({
        data: serverPlans,
        filteredData: this.getFilteredData(serverPlans)
      });
    });
  };

  render() {
    const { title, filteredData } = this.state;
    return (
      <PageTemplate title={title}>
        <Table data={filteredData} />
      </PageTemplate>
    );
  }
}

export default HomePageContainer;
