import { baseURL } from '../utils/constants';

export const handleDelete = async (setUpdate, handleToast, id, token) => {
  await fetch(`${baseURL}posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  })
    .then((json) => json.json())
    .then((data) => {
      handleToast('success', data.message);
    });

  setUpdate((prev) => !prev);
};
