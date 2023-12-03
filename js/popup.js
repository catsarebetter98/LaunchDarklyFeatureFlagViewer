$(document).ready(function() { 
  chrome.storage.local.get(['featureManagementData', 'url'], function (data) {
    var featureManagementData = data.featureManagementData;
    const url = data.url;
    // Use featureManagementData as needed in your popup.js
    console.log('FEATURE_MANAGEMENT data:', featureManagementData);
    console.log('url data:', url);

    // Assuming flagsState contains the given data
    metadata = featureManagementData;

    const url_h3 = document.createElement('h3');
    url_h3.textContent = 'URL (refresh for new data)';
    document.body.appendChild(url_h3);

    const url_div = document.createElement('div');
    url_div.textContent = data.url;
    document.body.appendChild(url_div);

    if (!featureManagementData){
      const url_h3 = document.createElement('h3');
      url_h3.textContent = 'LaunchDarkly Not Detected. Try to refresh the page if this is a mistake.';
      document.body.appendChild(url_h3);
      return;
    }

    const metadata_h2 = document.createElement('h2');
    metadata_h2.textContent = 'Metadata';
    document.body.appendChild(metadata_h2);

    const metaTable = document.createElement('table');
    metaTable.border = '0';

    const row = metaTable.insertRow();
    const keyCell = row.insertCell(0);
    const valueCell = row.insertCell(1);

    keyCell.textContent = "launchdarkly_client_id";
    valueCell.textContent = metadata.launchdarkly_client_id;


    for (const key in metadata.context) {
      if (Object.hasOwnProperty.call(metadata.context, key)) {
        const value = metadata.context[key];

        const row = metaTable.insertRow();
        const keyCell = row.insertCell(0);
        const valueCell = row.insertCell(1);

        keyCell.textContent = key;

        if (typeof value === 'object') {
          if (key === 'custom') {
            for (const customKey in value) {
              const customRow = metaTable.insertRow();
              const customKeyCell = customRow.insertCell(0);
              const customValueCell = customRow.insertCell(1);

              customKeyCell.textContent = customKey;
              customValueCell.textContent = value[customKey];
            }
          } else {
            valueCell.textContent = JSON.stringify(value);
          }
        } else {
          valueCell.textContent = value;
        }
      }
    }

    document.body.appendChild(metaTable);

    const br = document.createElement('br');
    document.body.appendChild(br.cloneNode());

    const flags_h2 = document.createElement('h2');
    flags_h2.textContent = 'Feature Flags';
    document.body.appendChild(flags_h2);

    const flagsState = featureManagementData.flags;
    
    delete flagsState.flagsState;
    delete flagsState.$valid;
    
    const sortedFlags = [];
    const trueFlags = [];
    const stringFlags = [];
    const falseFlags = [];
    
    for (const flag in flagsState) {
      if (Object.hasOwnProperty.call(flagsState, flag)) {
        const value = flagsState[flag];
    
        if (value === true) {
          trueFlags.push(flag);
        } else if (typeof value === 'string') {
          stringFlags.push({ flag, value });
        } else if (value === false) {
          falseFlags.push(flag);
        }
      }
    }
    
    stringFlags.sort((a, b) => a.value.localeCompare(b.value));
    
    sortedFlags.push(...trueFlags, ...stringFlags.map((item) => item.flag), ...falseFlags);
    
    const table = document.createElement('table');
    table.border = '0';
    
    sortedFlags.forEach((flag) => {
      const value = flagsState[flag];
    
      const row = table.insertRow();
      const flagCell = row.insertCell(0);
      const valueCell = row.insertCell(1);
    
      flagCell.textContent = flag;
      valueCell.textContent = value === true ? '\u2714' : value === false ? '\u2718' : value;
    
      if (value === false) {
        flagCell.style.color = 'gray';
      } else if (value === true) {
        flagCell.style.fontWeight = 'bold';
      }
    
      [flagCell, valueCell].forEach((cell) => {
        cell.addEventListener('mouseover', () => {
          row.style.border = '4px solid black';
        });
    
        cell.addEventListener('mouseout', () => {
          row.style.border = '1px solid black';
        });
      });
    
      flagCell.style.cursor = 'pointer';
      flagCell.title = 'Click to copy';
      flagCell.addEventListener('click', () => {
        navigator.clipboard.writeText(flag);
        flagCell.title = 'Copied!';
        setTimeout(() => {
          flagCell.title = 'Click to copy';
        }, 1500);
      });
    });
    
    document.body.appendChild(table);
    
  });  
})
