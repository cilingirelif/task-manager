const createProjectRequest = data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: "success",
          data
        });
      }, 1000); // 1s api response delay
    });
  };
  
  export default createProjectRequest;
  