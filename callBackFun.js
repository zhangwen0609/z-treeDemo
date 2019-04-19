//设置颜色
function setFontCss_ztree(treeId, treeNode) {

	if(treeNode.parentTId == null) {
		//根节点
		return {
			color: "red",
			"font-weight": "bold"
		};
	} else if(treeNode.isParent == false) {
		//叶子节点
		return(!!treeNode.highlight) ? {
			color: "#ff0000",
			"font-weight": "bold"
		} : {
			color: "#660099",
			"font-weight": "normal"
		};
	} else {
		//父节点
		return(!!treeNode.highlight) ? {
			color: "#ff0000",
			"font-weight": "bold"
		} : {
			color: "#333",
			"font-weight": "normal"
		};
	}
}
//对得到的json数据进行过滤，加载树的时候执行
function filter(treeId, parentNode, responseData) {
	var contents = (responseData.content) ? responseData.content : responseData;
	//当第一次加载的时候只显示一级节点，但是要让别人知道对应一级节点下是否有数据，那么就需要设置isParent,为true可以展开，下面有数据。
	//我这里是由于异步加载数据，只加载根节点以及一级节点。那么一级节点下还有子节点，所以设置isParent显示还有子节点的效果
	if(contents.length > 0) {
		for(var i = 0; i < contents.length; i++) {
			//是否是叶子节点
			var isParent = contents[i].isParent;
			if(isParent == false) {
				isParent = true;
			} else {
				isParent = false;
			}
			contents[i].isParent = isParent;
		}
	}
	return contents;
};

function addDiyDom(treeId, treeNode) {
	debugger;
	var aObj = $("#" + treeNode.tId + "_a");
	if($("#diyBtn_" + treeNode.id).length > 0) return;
	var editStr = "<span id='diyBtn_space_" + treeNode.id + "' > </span>" +
		"<button type='button' class='diyBtn1' id='diyBtn_" + treeNode.id +
		"' title='" + treeNode.name + "' onfocus='this.blur();'>自定义固定显示的按钮</button>";
	aObj.append(editStr);
	var btn = $("#diyBtn_" + treeNode.id);
	if(btn) btn.bind("click", function() {
		alert("diy Button for " + treeNode.name);
	});
};

function addHoverDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if($("#diyBtn1_" + treeNode.id).length > 0) return;
	var editStr = "<span id='diyBtn1_space_" + treeNode.id + "' > </span>" +
		"<button type='button' class='diyBtn2' id='diyBtn1_" + treeNode.id +
		"' title='" + treeNode.name + "' onfocus='this.blur();'>自定义鼠标移入显示的按钮</button>";
	aObj.append(editStr);
	var btn = $("#diyBtn1_" + treeNode.id);
	if(btn) btn.bind("click", function() {
		alert("diy Button for " + treeNode.name);
	});
};

function removeHoverDom(treeId, treeNode) {
	$("#diyBtn1_" + treeNode.id).unbind().remove();
	$("#diyBtn1_space_" + treeNode.id).unbind().remove();
};
var firstAsyncSuccessFlag = 0;
function zTreeOnAsyncSuccess(event, treeId, msg) {
	if(firstAsyncSuccessFlag == 0) {
		try {
			var treeObj = $.fn.zTree.getZTreeObj("busTree");
			var selectedNode = zTree.getSelectedNodes();
			//获取整个json节点
			var nodes = zTree.getNodes();
			//展开根节点下的第一个节点
			treeObj.expandNode(nodes[0], true);
			//把根节点下的所有节点转换为数组
			var childNodes = zTree.transformToArray(nodes[0]);
			//展开根节点下的第一个节点的第一节节点
			treeObj.expandNode(childNodes[1], true);
			//选中根节点下的第一个节点
			treeObj.selectNode(childNodes[1]);
			firstAsyncSuccessFlag = 1;
		} catch(err) {
			holly.showError("数据异常", err);
		}
	}
}