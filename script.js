(function () {
  var storageKey = 'debloatGuideTheme';
  var root = document.documentElement;
  var themeButtons = document.querySelectorAll('.themeSwitch button');

  function applyTheme(choice) {
    root.classList.remove('light', 'dark');
    if (choice === 'light' || choice === 'dark') {
      root.classList.add(choice);
    }
    themeButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.theme === choice));
    });
  }

  function readSaved() {
    try {
      return localStorage.getItem(storageKey) || 'system';
    } catch (error) {
      return 'system';
    }
  }

  function saveChoice(choice) {
    try {
      localStorage.setItem(storageKey, choice);
    } catch (error) {}
  }

  themeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var choice = button.dataset.theme;
      saveChoice(choice);
      applyTheme(choice);
    });
  });

  applyTheme(readSaved());

  var body = document.getElementById('serviceBody');
  var filter = document.getElementById('serviceFilter');
  var verdictSelect = document.getElementById('serviceVerdict');
  var empty = document.getElementById('serviceEmpty');
  var count = document.getElementById('serviceCount');

  function cell(text, className) {
    var td = document.createElement('td');
    td.textContent = text;
    if (className) {
      td.className = className;
    }
    return td;
  }

  function verdictClass(verdict) {
    if (verdict === 'Disabled by me') {
      return 'verdictOff';
    }
    if (verdict === 'Keep on') {
      return 'verdictKeep';
    }
    if (verdict === 'Should be disabled') {
      return 'verdictWarn';
    }
    return 'verdictPlain';
  }

  function render() {
    body.textContent = '';
    serviceData.forEach(function (service) {
      var row = document.createElement('tr');
      row.appendChild(cell(service.name, 'serviceName'));
      row.appendChild(cell(service.state));
      row.appendChild(cell(service.startup));
      row.appendChild(cell(service.verdict, verdictClass(service.verdict)));
      row.appendChild(cell(service.what));
      row.appendChild(cell(service.why));
      row.dataset.search = (
        service.name +
        ' ' +
        service.what +
        ' ' +
        service.why +
        ' ' +
        service.verdict
      ).toLowerCase();
      row.dataset.verdict = service.verdict;
      body.appendChild(row);
    });
  }

  function applyFilters() {
    var query = filter.value.trim().toLowerCase();
    var verdict = verdictSelect.value;
    var visible = 0;
    body.querySelectorAll('tr').forEach(function (row) {
      var matchesText = row.dataset.search.indexOf(query) !== -1;
      var matchesVerdict = verdict === 'all' || row.dataset.verdict === verdict;
      var show = matchesText && matchesVerdict;
      row.hidden = !show;
      if (show) {
        visible += 1;
      }
    });
    empty.hidden = visible !== 0;
    count.textContent = 'Showing ' + visible + ' of ' + serviceData.length + ' services';
  }

  if (body) {
    render();
    filter.addEventListener('input', applyFilters);
    verdictSelect.addEventListener('change', applyFilters);
    applyFilters();
  }

  document.querySelectorAll('.copyButton').forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.dataset.copy;
      var original = button.textContent;
      var done = function () {
        button.textContent = 'Copied';
        setTimeout(function () {
          button.textContent = original;
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var field = document.createElement('textarea');
        field.value = text;
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        field.remove();
        done();
      }
    });
  });
})();
