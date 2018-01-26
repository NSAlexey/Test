using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Windows.Forms;
using Telerik.Windows.Diagrams.Core;

namespace TestWindowsFormsApplication
{
    public partial class MultiLanguageTextBox : UserControl
    {
        // Dictionary of Language & Text values
        private Dictionary<CultureInfo, string> _values;

        // Localization of component
        private CultureInfo _cultureInfo;

        [Browsable(false)]
        public CultureInfo CultureInfo
        {
            get { return _cultureInfo ?? (_cultureInfo = CultureInfo.CurrentCulture); }
            set { _cultureInfo = value; }
        }

        [Browsable(false)]
        public Dictionary<CultureInfo, string> TextBoxValues
        {
            get
            {
                dataGridViewMultiLang.EndEdit();
                return this.dataGridViewMultiLang.Rows.Cast<object>()
                        .Select((t, i) => dataGridViewMultiLang.Rows[i])
                        .ToDictionary(r => new CultureInfo(r.Cells[0].Value.ToString()), v => v.Cells[1].Value.ToString());
            }

            set
            {
                _values = value;
                if (value.Count <= 0) return;
                dataGridViewMultiLang.Rows.Clear();
                _values.ForEach(r => {dataGridViewMultiLang.Rows.Add(r.Key.TwoLetterISOLanguageName.ToUpper(), r.Value);});
            }
        }

        public MultiLanguageTextBox()
        {
            InitializeComponent();
        }

        private void radMultiLangPopupEditor_Enter(object sender, EventArgs e)
        {
            radMultiLangPopupEditor.PopupEditorElement.ShowPopup();
        }

        private void radMultiLangPopupEditor_MouseClick(object sender, MouseEventArgs e)
        {
            radMultiLangPopupEditor.PopupEditorElement.ShowPopup();
        }

        private void radMultiLangPopupEditor_PopupOpened(object sender, System.EventArgs e)
        {
            dataGridViewMultiLang.CurrentCell = dataGridViewMultiLang.Rows[0].Cells[1];
            dataGridViewMultiLang.BeginEdit(true);
        }

        private void dataGridViewMultiLang_CellEnter(object sender, DataGridViewCellEventArgs e)
        {
            if (!dataGridViewMultiLang.Rows[e.RowIndex].Cells[e.ColumnIndex].IsInEditMode)
            {
                dataGridViewMultiLang.BeginEdit(true);
            }
        }

        private void MultiLanguageTextBox_Load(object sender, EventArgs e)
        {
            radMultiLangPopupContainer.Size = new System.Drawing.Size(this.Size.Width, radMultiLangPopupContainer.Size.Height);
            radMultiLangPopupContainer.Height = (dataGridViewMultiLang.Rows[0].Height + 2) * _values.Count;
            
            radMultiLangPopupEditor.Text = _values.FirstOrDefault(r => r.Key.TwoLetterISOLanguageName == this.CultureInfo.TwoLetterISOLanguageName).Value ?? _values.FirstOrDefault().Value;
        }

        private void dataGridViewMultiLang_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            ChangePopupEditorText();

            if (dataGridViewMultiLang.RowCount != e.RowIndex + 1) return;
            radMultiLangPopupEditor.PopupEditorElement.ClosePopup();
        }

        private void radMultiLangPopupEditor_PopupClosed(object sender, Telerik.WinControls.UI.RadPopupClosedEventArgs args)
        {
            ChangePopupEditorText();
            this.Focus();
        }

        private void ChangePopupEditorText()
        {
            dataGridViewMultiLang.EndEdit();
            radMultiLangPopupEditor.Text = dataGridViewMultiLang.Rows[0].Cells[1].Value.ToString();
            foreach (DataGridViewRow row in dataGridViewMultiLang.Rows)
            {
                if (row.Cells[0].Value.ToString() == CultureInfo.TwoLetterISOLanguageName.ToUpper())
                {
                    radMultiLangPopupEditor.Text = row.Cells[1].Value.ToString();
                }
            }
        }
    }
}
