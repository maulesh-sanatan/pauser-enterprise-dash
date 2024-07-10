export const postApi = async (endPoint, data) => {
  console.log(data.img, "data in api");
  const formData = new FormData();
  if (data?.img && data?.img instanceof File) {
    formData.append("files[]", data?.img, data?.img?.name);
  }

  Object.keys(data).forEach((key) => {
    if (key !== "img") {
      formData.append(key, data[key]);
    }
  });
  console.log(formData.getAll("files[]"), "tytytyt");
  const config = {
    method: "post",
    // headers: { 'Content-Type': 'multipart/form-data' },
    credentials: "include",
    cache: "no-store",
    body: formData,
  };
  try {
    const response = await fetch(endPoint, config);
    return response;
  } catch (e) {
    console.log((e) => e.message);
    throw e;
  }
};
export const post = async (endPoint, data) => {
  const config = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(endPoint, config);
    return response;
  } catch (e) {
    console.log((e) => e.message);
    throw e;
  }
};
export const Delete = async (endPoint, data) => {
  const config = {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(endPoint, config);
    return response;
  } catch (e) {
    console.log((e) => e.message);
    throw e;
  }
};
export const put = async (endPoint, data) => {
  const config = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(endPoint, config);
    return response;
  } catch (e) {
    console.log((e) => e.message);
    throw e;
  }
};

