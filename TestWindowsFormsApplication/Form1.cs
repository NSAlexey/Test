using System;
using System.Collections.Generic;
using System.Globalization;
using System.Windows.Forms;

namespace TestWindowsFormsApplication
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.multiLanguageTextBox1.TextBoxValues = new Dictionary<CultureInfo, string>() { { new CultureInfo("sw"), "Test Sweedish" }, { new CultureInfo("en"), "Test English" }, { new CultureInfo("fr"), "Test French" } };
            this.multiLanguageTextBox1.CultureInfo = new CultureInfo("no");
        }

        private void btnGetValues_Click(object sender, System.EventArgs e)
        {
            var result = this.multiLanguageTextBox1.TextBoxValues;
            this.tbResults.Clear();
            foreach (var row in result)
            {
                this.tbResults.Text += string.Format("{0}: {1}"+Environment.NewLine, row.Key.Name, row.Value);
            }
        }
    }
}
