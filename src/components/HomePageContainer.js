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
    const { title } = props;
    this.state = {
      data: [],
      filteredData: [],
      title
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged = () => {
    const { location } = this.props;
    const { data } = this.state;
    const newFilter = this.getFilterValue(location);
    const filteredData =
      newFilter === '*'
        ? data
        : data.filter(project => project.overallStatus === newFilter);
    this.setState({
      filteredData
    });
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
        filteredData: serverPlans
      });
    });
  };

  render() {
    const { title, filteredData } = this.state;
    return (
      <PageTemplate pageTitle={title}>
        <Table pageTitle={title} data={filteredData} />
      </PageTemplate>
    );
  }
}

export default HomePageContainer;
