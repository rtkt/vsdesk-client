const { cloneDeep } = require("lodash");
const ids = require("./ids.json");

function checkEntry(entry, url) {
  const data = cloneDeep(entry);
  if (url.pathname === "/api/assets") {
    if (!data.asset_attrib_id) {
      data.asset_attrib_id = ids.assets[data.asset_attrib_name];
    }
  }
  return data;
}

module.exports = {
  checkEntry,
};
