const formatDate = (date) => {
   const inputDate = new Date(date);

   const options = {
   day: '2-digit',
   month: '2-digit',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   hour12: true,
   };

   const formattedDate = inputDate.toLocaleString('en-US', options);
   return formattedDate;
}

export {
   formatDate
}