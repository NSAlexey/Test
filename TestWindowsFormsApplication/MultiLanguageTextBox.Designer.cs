using System.Windows.Forms;

namespace TestWindowsFormsApplication
{
    partial class MultiLanguageTextBox 
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.radMultiLangPopupContainer = new Telerik.WinControls.UI.RadPopupContainer();
            this.dataGridViewMultiLang = new System.Windows.Forms.DataGridView();
            this.CultureInfoName = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.TextValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.radMultiLangPopupEditor = new Telerik.WinControls.UI.RadPopupEditor();
            ((System.ComponentModel.ISupportInitialize)(this.radMultiLangPopupContainer)).BeginInit();
            this.radMultiLangPopupContainer.PanelContainer.SuspendLayout();
            this.radMultiLangPopupContainer.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewMultiLang)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radMultiLangPopupEditor)).BeginInit();
            this.SuspendLayout();
            // 
            // radMultiLangPopupContainer
            // 
            this.radMultiLangPopupContainer.Location = new System.Drawing.Point(0, 26);
            this.radMultiLangPopupContainer.Name = "radMultiLangPopupContainer";
            // 
            // radMultiLangPopupContainer.PanelContainer
            // 
            this.radMultiLangPopupContainer.PanelContainer.Controls.Add(this.dataGridViewMultiLang);
            this.radMultiLangPopupContainer.PanelContainer.Size = new System.Drawing.Size(325, 69);
            this.radMultiLangPopupContainer.Size = new System.Drawing.Size(327, 71);
            this.radMultiLangPopupContainer.TabIndex = 0;
            this.radMultiLangPopupContainer.Text = "radMultiLangPopupContainer";
            // 
            // dataGridViewMultiLang
            // 
            this.dataGridViewMultiLang.AllowUserToAddRows = false;
            this.dataGridViewMultiLang.AllowUserToDeleteRows = false;
            this.dataGridViewMultiLang.AllowUserToResizeColumns = false;
            this.dataGridViewMultiLang.AllowUserToResizeRows = false;
            this.dataGridViewMultiLang.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewMultiLang.ColumnHeadersVisible = false;
            this.dataGridViewMultiLang.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.CultureInfoName,
            this.TextValue});
            this.dataGridViewMultiLang.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dataGridViewMultiLang.Location = new System.Drawing.Point(0, 0);
            this.dataGridViewMultiLang.MultiSelect = false;
            this.dataGridViewMultiLang.Name = "dataGridViewMultiLang";
            this.dataGridViewMultiLang.RowHeadersVisible = false;
            this.dataGridViewMultiLang.Size = new System.Drawing.Size(325, 69);
            this.dataGridViewMultiLang.TabIndex = 0;
            this.dataGridViewMultiLang.CellEndEdit += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewMultiLang_CellEndEdit);
            this.dataGridViewMultiLang.CellEnter += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewMultiLang_CellEnter);
            // 
            // CultureInfoName
            // 
            this.CultureInfoName.FillWeight = 30F;
            this.CultureInfoName.Frozen = true;
            this.CultureInfoName.HeaderText = "CultureInfoName";
            this.CultureInfoName.Name = "CultureInfoName";
            this.CultureInfoName.ReadOnly = true;
            this.CultureInfoName.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            this.CultureInfoName.Width = 30;
            // 
            // TextValue
            // 
            this.TextValue.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.TextValue.HeaderText = "Text";
            this.TextValue.Name = "TextValue";
            this.TextValue.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // radMultiLangPopupEditor
            // 
            this.radMultiLangPopupEditor.AssociatedControl = this.radMultiLangPopupContainer;
            this.radMultiLangPopupEditor.Dock = System.Windows.Forms.DockStyle.Top;
            this.radMultiLangPopupEditor.Location = new System.Drawing.Point(0, 0);
            this.radMultiLangPopupEditor.Name = "radMultiLangPopupEditor";
            this.radMultiLangPopupEditor.ShowTextBox = false;
            this.radMultiLangPopupEditor.Size = new System.Drawing.Size(366, 20);
            this.radMultiLangPopupEditor.TabIndex = 1;
            this.radMultiLangPopupEditor.PopupOpened += new System.EventHandler(this.radMultiLangPopupEditor_PopupOpened);
            this.radMultiLangPopupEditor.PopupClosed += new Telerik.WinControls.UI.RadPopupClosedEventHandler(this.radMultiLangPopupEditor_PopupClosed);
            this.radMultiLangPopupEditor.Click += new System.EventHandler(this.radMultiLangPopupEditor_Enter);
            this.radMultiLangPopupEditor.Enter += new System.EventHandler(this.radMultiLangPopupEditor_Enter);
            this.radMultiLangPopupEditor.MouseClick += new System.Windows.Forms.MouseEventHandler(this.radMultiLangPopupEditor_MouseClick);
            ((Telerik.WinControls.UI.RadDropDownListArrowButtonElement)(this.radMultiLangPopupEditor.GetChildAt(0).GetChildAt(2).GetChildAt(1))).Visibility = Telerik.WinControls.ElementVisibility.Hidden;
            // 
            // MultiLanguageTextBox
            // 
            this.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.Controls.Add(this.radMultiLangPopupContainer);
            this.Controls.Add(this.radMultiLangPopupEditor);
            this.Name = "MultiLanguageTextBox";
            this.Size = new System.Drawing.Size(366, 20);
            this.Load += new System.EventHandler(this.MultiLanguageTextBox_Load);
            this.Enter += new System.EventHandler(this.radMultiLangPopupEditor_Enter);
            this.radMultiLangPopupContainer.PanelContainer.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.radMultiLangPopupContainer)).EndInit();
            this.radMultiLangPopupContainer.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewMultiLang)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radMultiLangPopupEditor)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Telerik.WinControls.UI.RadPopupEditor radMultiLangPopupEditor;
        private Telerik.WinControls.UI.RadPopupContainer radMultiLangPopupContainer;
        private DataGridViewTextBoxColumn CultureInfoName;
        private DataGridViewTextBoxColumn TextValue;
        private DataGridView dataGridViewMultiLang;
    }
}
