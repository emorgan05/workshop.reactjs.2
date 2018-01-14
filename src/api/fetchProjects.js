import axios from 'axios';
import format from 'date-fns/format';

const getFormattedDate = date => format(new Date(date), 'MM/DD/YYYY hh:mm A');
const getEditUrl = id => `/#/edit?projectId=${id}`;

const formatProjectsData = data => {
  const items = data.map(item => {
    const modifiedDate = getFormattedDate(item.modifiedDate);
    const editUrl = getEditUrl(item.id);
    return { ...item, modifiedDate, editUrl };
  });
  return items;
};

const fetchProjects = () => {
  const request = 'http://localhost:3004/projects';
  return axios(request)
    .then(response => {
      const { data } = response;
      console.log(data);
      return formatProjectsData(data);
    })
    .catch(error => {
      console.log(error);
      return [];
    });
};

export default fetchProjects;
